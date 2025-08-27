import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="relative mt-20">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-white pointer-events-none" />
			<div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-600">
					<div>
						<div className="flex items-center gap-2 mb-4 sm:justify-start justify-center">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold">A</span>
							</div>
							<span className="text-lg font-semibold text-gray-900">AISEO Turbo</span>
						</div>
						<p className="text-gray-500 text-center sm:text-left">AI‑powered SEO platform to analyze, monitor, and grow your organic traffic.</p>
						<div className="flex gap-3 mt-4 opacity-80 justify-center sm:justify-start">
							<Image src="/brand/badge-g2.svg" alt="G2" width={64} height={64} />
							<Image src="/brand/badge-capterra.svg" alt="Capterra" width={96} height={64} />
						</div>
					</div>
					<div>
						<div className="font-semibold mb-3 text-gray-900">Product</div>
						<ul className="space-y-2">
							<li><Link href="/features" className="hover:text-blue-600">Features</Link></li>
							<li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
							<li><Link href="/seo-audit" className="hover:text-blue-600">SEO Audit</Link></li>
							<li><Link href="/rank-tracker" className="hover:text-blue-600">Rank Tracker</Link></li>
						</ul>
					</div>
					<div>
						<div className="font-semibold mb-3 text-gray-900">Company</div>
						<ul className="space-y-2">
							<li><Link href="/about" className="hover:text-blue-600">About</Link></li>
							<li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
							<li><Link href="/careers" className="hover:text-blue-600">Careers</Link></li>
						</ul>
					</div>
					<div>
						<div className="font-semibold mb-3 text-gray-900">Resources</div>
						<ul className="space-y-2">
							<li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
							<li><Link href="/docs" className="hover:text-blue-600">Docs</Link></li>
							<li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
						</ul>
					</div>
				</div>
				<div className="mt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
					<div>© {new Date().getFullYear()} AISEO Turbo. All rights reserved.</div>
					<div className="space-x-4 mt-2 sm:mt-0">
						<Link href="/legal/privacy" className="hover:text-blue-600">Privacy</Link>
						<Link href="/legal/terms" className="hover:text-blue-600">Terms</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

// Spacer to prevent sticky audit bar from overlapping footer on long pages
export function BottomSpacer() {
	return <div className="h-24" />;
}
