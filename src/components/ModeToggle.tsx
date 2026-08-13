import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const [theme, setThemeState] = useState(false)

    useEffect(() => {
        setThemeState(document.documentElement.classList.contains("dark"))
    }, [])

    const toggleTheme = () => {
        const nextTheme = !theme;
        setThemeState(nextTheme);
        document.documentElement.classList[nextTheme ? "add" : "remove"]("dark");
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}