import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t border-soft surface-glass backdrop-blur rounded-t-xl">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-link text-center">&copy; {year} - Gustavo Baranda</div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/GustavoBaranda" target="_blank" className="text-muted-link transition-colors hover:opacity-100! opacity-70!">
            <span className="w-5 h-5"><Github className="w-5 h-5" /></span>
          </Link>
          <Link href="https://www.linkedin.com/in/gustavobaranda/" target="_blank" className="text-muted-link transition-colors hover:opacity-100! opacity-70!">
            <span className="w-5 h-5"><Linkedin className="w-5 h-5" /></span>
          </Link>
          <Link href="mailto:baranda.gustavo@gmail.com" className="text-muted-link transition-colors hover:opacity-100! opacity-70!">
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
