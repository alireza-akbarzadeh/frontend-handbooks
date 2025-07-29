"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Code2, Menu, X, BookOpen, Play, Bot, User, Award, CreditCard, ChevronDown, Sparkles, Zap } from "lucide-react"
import ModeToggle from "./mode-toggle.tsx";
import {Button} from "../ui/button.tsx";


const navigationItems = [
    {
        name: "Courses",
        href: "/courses",
        icon: BookOpen,
        description: "Learn with structured courses",
    },
    {
        name: "Docs",
        href: "/docs",
        icon: BookOpen,
        description: "Comprehensive documentation",
    },
    {
        name: "Playground",
        href: "/playground",
        icon: Play,
        description: "Code and experiment",
    },
    {
        name: "AI Tutor",
        href: "/ai/tutor",
        icon: Bot,
        description: "Get AI-powered help",
        badge: "New",
    },
]

const accountItems = [
    { name: "Profile", href: "/account/profile", icon: User },
    { name: "Certifications", href: "/account/certifications", icon: Award },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
]

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg shadow-gray-900/5"
                        : "bg-transparent"
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                    <Code2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
                            </div>
                            <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                  FrontendPro
                </span>
                                <div className="flex items-center gap-1 -mt-1">
                                    <Sparkles className="w-3 h-3 text-emerald-500" />
                                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Pro</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <motion.div key={item.name} className="relative group">
                                        <a
                                            href={item.href}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group"
                                        >
                                            <IconComponent className="w-4 h-4" />
                                            <span className="font-medium">{item.name}</span>
                                            {item.badge && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full">
                          {item.badge}
                        </span>
                                            )}
                                        </a>
                                        {/* Tooltip */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                            {item.description}
                                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Account Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">Account</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${isAccountDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isAccountDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-800/20 backdrop-blur-xl overflow-hidden"
                                        >
                                            {accountItems.map((item) => {
                                                const IconComponent = item.icon
                                                return (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                                                    >
                                                        <IconComponent className="w-4 h-4" />
                                                        <span className="font-medium">{item.name}</span>
                                                    </a>
                                                )
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-3">
                            <div className="hidden lg:block">
                                <ModeToggle />
                            </div>

                            <Button
                                variant="outline"
                                className="hidden lg:inline-flex border-emerald-500/20 text-emerald-600 hover:bg-emerald-500 hover:text-white bg-emerald-50/50 dark:border-emerald-400/20 dark:text-emerald-400 dark:bg-emerald-950/20 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200 shadow-lg shadow-emerald-500/10"
                                asChild
                            >
                                <a href="/login">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Sign In
                                </a>
                            </Button>

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                            <Code2 className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">FrontendPro</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Mobile Navigation */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="space-y-2">
                                        {navigationItems.map((item) => {
                                            const IconComponent = item.icon
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <IconComponent className="w-5 h-5" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{item.name}</span>
                                                            {item.badge && (
                                                                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full">
                                  {item.badge}
                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                                    </div>
                                                </a>
                                            )
                                        })}

                                        <div className="border-t border-gray-200 dark:border-gray-800 my-4" />

                                        {accountItems.map((item) => {
                                            const IconComponent = item.icon
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <IconComponent className="w-5 h-5" />
                                                    <span className="font-medium">{item.name}</span>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Mobile Footer */}
                                <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                                        <ModeToggle />
                                    </div>
                                    <Button
                                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg"
                                        asChild
                                    >
                                        <a href="/login">
                                            <Zap className="w-4 h-4 mr-2" />
                                            Sign In
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer for fixed header */}
            <div className="h-20" />
        </>
    )
}
