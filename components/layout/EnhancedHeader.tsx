"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
	label: string;
	href: string;
	description?: string;
	// simple inline icon SVG path (Heroicons outline paths)
	iconPath?: string;
}

interface DropdownMenu {
	label: string;
	items: DropdownItem[];
}

const navigationMenus: DropdownMenu[] = [
	{
		label: 'Tools',
		items: [
			{ label: 'SEO Audit', href: '/seo-audit', description: 'Comprehensive website analysis', iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
			{ label: 'Site Crawler', href: '/site-crawler', description: 'Deep website crawling', iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
			{ label: 'Backlinks', href: '/backlinks', description: 'Backlink analysis & monitoring', iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
			{ label: 'Rank Tracker', href: '/rank-tracker', description: 'Keyword ranking tracking', iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
			{ label: 'Competitor Analysis', href: '/competitor-analysis', description: 'Competitor insights', iconPath: 'M3 7h18M3 12h18M3 17h18' }
		]
	},
	{
		label: 'Features',
		items: [
			{ label: 'AI-Powered Analysis', href: '/features/ai-analysis', description: 'Advanced AI insights' },
			{ label: 'Real-time Monitoring', href: '/features/monitoring', description: 'Live performance tracking' },
			{ label: 'Custom Reports', href: '/features/reports', description: 'Personalized reporting' },
			{ label: 'API Access', href: '/features/api', description: 'Developer API integration' },
			{ label: 'White-label Solutions', href: '/features/white-label', description: 'Branded solutions' }
		]
	},
	{
		label: 'Resources',
		items: [
			{ label: 'Blog', href: '/blog', description: 'SEO insights & tips' },
			{ label: 'Documentation', href: '/docs', description: 'Complete user guide' },
			{ label: 'Case Studies', href: '/case-studies', description: 'Success stories' },
			{ label: 'Help Center', href: '/help', description: 'Support & tutorials' },
			{ label: 'Community', href: '/community', description: 'User community' }
		]
	},
	{
		label: 'Company',
		items: [
			{ label: 'About Us', href: '/about', description: 'Our story & mission' },
			{ label: 'Pricing', href: '/pricing', description: 'Plans & pricing' },
			{ label: 'Contact', href: '/contact', description: 'Get in touch' },
			{ label: 'Careers', href: '/careers', description: 'Join our team' }
		]
	}
];

interface DropdownProps {
	menu: DropdownMenu;
	isOpen: boolean;
	onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ menu, isOpen, onClose }) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 z-50"
				>
					<div className="px-6">
						<div className="grid grid-cols-3 gap-6">
							<div className="col-span-2">
								<h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">{menu.label}</h3>
								<div className="grid grid-cols-2 gap-2">
									{menu.items.map((item, index) => (
										<Link
											key={index}
											href={item.href}
											onClick={onClose}
											className="group flex items-start space-x-3 rounded-xl p-3 hover:bg-blue-50 transition-colors"
										>
											<div className="mt-0.5 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath || 'M4 6h16M4 12h16M4 18h16'} />
												</svg>
											</div>
											<div>
												<div className="font-semibold text-gray-900 group-hover:text-blue-700">{item.label}</div>
												{item.description && <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>}
											</div>
										</Link>
									))}
								</div>
							</div>
							<div className="col-span-1">
								<div className="h-full rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-4 text-white flex flex-col justify-between shadow-lg overflow-hidden">
									<div>
										<div className="text-sm uppercase tracking-wider text-blue-100 mb-1">New</div>
										<div className="font-semibold">AI SEO Audit</div>
										<p className="text-xs text-blue-100 mt-2">Run a free audit and get prioritized issues and fixes.</p>
									</div>
									<div className="relative mt-3 mb-2 rounded-lg overflow-hidden">
										<Image src="/brand/menu-illustration.svg" alt="SEO illustration" width={320} height={200} className="w-full h-24 object-cover opacity-90"/>
									</div>
									<Link href="/seo-audit" onClick={onClose} className="mt-3 inline-flex items-center text-sm font-medium bg-white text-blue-700 rounded-lg px-3 py-2 hover:bg-gray-50">
										Start free audit
										<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const EnhancedHeader: React.FC = () => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleDropdownToggle = (label: string) => {
		setActiveDropdown(activeDropdown === label ? null : label);
	};

	const closeAllDropdowns = () => {
		setActiveDropdown(null);
		setIsMobileMenuOpen(false);
	};

	return (
		<header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2" onClick={closeAllDropdowns}>
							<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">A</span>
							</div>
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								AISEO Turbo
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navigationMenus.map((menu) => (
							<div key={menu.label} className="relative">
								<button
									onClick={() => handleDropdownToggle(menu.label)}
									onMouseEnter={() => setActiveDropdown(menu.label)}
									className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
								>
									<span>{menu.label}</span>
									<svg
										className={`w-4 h-4 transition-transform ${activeDropdown === menu.label ? 'rotate-180' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								<Dropdown
									menu={menu}
									isOpen={activeDropdown === menu.label}
									onClose={() => setActiveDropdown(null)}
								/>
							</div>
						))}
					</nav>

					{/* CTA Button */}
					<div className="hidden lg:flex items-center space-x-4">
						<Link
							href="/seo-audit"
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
						>
							Start Free Audit
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="lg:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{isMobileMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="lg:hidden border-t border-gray-200 bg-white"
						>
							<div className="px-4 py-6 space-y-4">
								{navigationMenus.map((menu) => (
									<div key={menu.label}>
										<h3 className="text-sm font-semibold text-gray-900 mb-2">{menu.label}</h3>
										<div className="space-y-1">
											{menu.items.map((item, index) => (
												<Link
													key={index}
													href={item.href}
													onClick={closeAllDropdowns}
													className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
												>
													<div className="font-medium">{item.label}</div>
													{item.description && (
														<div className="text-xs text-gray-500 mt-1">{item.description}</div>
													)}
												</Link>
											))}
										</div>
									</div>
								))}
								<div className="pt-4 border-t border-gray-200">
									<Link
										href="/seo-audit"
										onClick={closeAllDropdowns}
										className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
									>
										Start Free Audit
									</Link>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
};

export default EnhancedHeader;
