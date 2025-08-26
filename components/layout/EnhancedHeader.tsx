"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
	label: string;
	href: string;
	description?: string;
	icon?: string;
}

interface DropdownMenu {
	label: string;
	items: DropdownItem[];
}

const navigationMenus: DropdownMenu[] = [
	{
		label: 'Tools',
		items: [
			{ label: 'SEO Audit', href: '/seo-audit', description: 'Comprehensive website analysis' },
			{ label: 'Site Crawler', href: '/site-crawler', description: 'Deep website crawling' },
			{ label: 'Backlinks', href: '/backlinks', description: 'Backlink analysis & monitoring' },
			{ label: 'Rank Tracker', href: '/rank-tracker', description: 'Keyword ranking tracking' },
			{ label: 'Competitor Analysis', href: '/competitor-analysis', description: 'Competitor insights' }
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
					className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50"
				>
					<div className="px-4 py-2">
						<h3 className="text-sm font-semibold text-gray-900 mb-3">{menu.label}</h3>
						<div className="space-y-1">
							{menu.items.map((item, index) => (
								<Link
									key={index}
									href={item.href}
									onClick={onClose}
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
