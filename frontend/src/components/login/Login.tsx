'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Login() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Ingrese su email y contraseña para ingresar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href="#" className="text-sm text-muted-foreground hover:underline" prefetch={false}>
            Elvidates la contraseña?
          </Link>
          <Button type="submit" className="ml-auto">
            Ingresar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}