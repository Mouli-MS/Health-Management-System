import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import { prisma } from '../../../lib/prisma'
import logger from '../../../lib/logger'

export async function POST(request: NextRequest) {
  try {
    console.log('JWT_SECRET:', process.env.JWT_SECRET)
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('User not found')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log('Invalid password')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('User found:', user.email, user.role)

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    console.log('Token generated')

    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, role: user.role },
      token
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: false, // Temporarily set to false for localhost
      sameSite: 'lax',
      path: '/',
      domain: '127.0.0.1',
      maxAge: 3600, // 1 hour
    })

    console.log('Response sent')
    return response
  } catch (error) {
    logger.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
