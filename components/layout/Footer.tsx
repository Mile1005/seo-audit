import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="border-t border-white/20 dark:border-white/10 mt-16">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
					<div>
						<div className="font-semibold mb-2">Product</div>
						<Link href="/features" className="block">Features</Link>
						<Link href="/pricing" className="block">Pricing</Link>
					</div>
					<div>
						<div className="font-semibold mb-2">Company</div>
						<Link href="/about" className="block">About</Link>
						<Link href="/contact" className="block">Contact</Link>
					</div>
					<div>
						<div className="font-semibold mb-2">Resources</div>
						<Link href="/blog" className="block">Blog</Link>
					</div>
					<div>
						<div className="font-semibold mb-2">Legal</div>
						<Link href="/legal/privacy" className="block">Privacy</Link>
						<Link href="/legal/terms" className="block">Terms</Link>
					</div>
				</div>
				<div className="mt-8">© {new Date().getFullYear()} AISEO Turbo. All rights reserved.</div>
			</div>
		</footer>
	);
}
