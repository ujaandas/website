import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const syncTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        syncTheme()
        document.addEventListener("astro:after-swap", syncTheme)

        return () => {
            document.removeEventListener("astro:after-swap", syncTheme)
        }
    }, [])

    const toggleTheme = () => {
        const nextDark = !document.documentElement.classList.contains("dark")

        document.documentElement.classList.toggle("dark", nextDark)
        localStorage.setItem("theme", nextDark ? "dark" : "light")
        setIsDark(nextDark)
    }

    return (
        <Button variant="link" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}