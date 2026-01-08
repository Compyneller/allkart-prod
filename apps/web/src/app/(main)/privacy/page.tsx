import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Bagalkidukaan",
    description: "Learn how Bagalkidukaan collects, uses, stores, and protects your data. Read our comprehensive privacy policy.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                <div className="container mx-auto px-4 py-16 sm:py-24 relative">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <div className="inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Your Data, Our Responsibility
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            How we collect, use, store, and protect your information
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Last Updated: January 3, 2026</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction Card */}
                    <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                        <p className="text-foreground leading-relaxed">
                            <span className="font-semibold text-primary">Bagalkidukaan</span>{" "}
                            (&quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
                            <Link href="/" className="text-primary hover:underline font-medium">https://www.bagalkidukaan.store</Link>.
                        </p>
                        <p className="mt-4 text-foreground leading-relaxed">
                            This Privacy Policy explains how we collect, use, store, and protect user data.
                        </p>
                        <p className="mt-4 text-foreground leading-relaxed">
                            By using Bagalkidukaan, you explicitly agree to this Privacy Policy.{" "}
                            <span className="font-semibold text-destructive">If you don&apos;t agree, stop using the Platform.</span>
                        </p>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    1
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Information We Collect</h2>
                            </div>
                            <div className="ml-13 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">1.1 Information You Provide</h3>
                                    <p className="text-foreground/90 mb-4">We collect information you voluntarily provide, including but not limited to:</p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Name",
                                            "Email address",
                                            "Phone number",
                                            "Store name and physical location",
                                            "Business details",
                                            "Product listings and descriptions",
                                            "Delivery preferences",
                                            "Ratings, reviews, and reports"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                                <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-foreground/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <p className="text-destructive font-semibold">⚠️ If you provide false or misleading data, you alone bear the consequences.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">1.2 Automatically Collected Information</h3>
                                    <p className="text-foreground/90 mb-4">We automatically collect:</p>
                                    <div className="space-y-2">
                                        {[
                                            "IP address",
                                            "Device information",
                                            "Browser type",
                                            "Location data (used to enforce the 5 km selling radius)",
                                            "Usage data and interaction logs"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                                <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-foreground/90 text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                        <p className="text-foreground font-semibold text-sm">
                                            You cannot use Bagalkidukaan without this data collection.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">1.3 Payment Information</h3>
                                    <div className="space-y-3">
                                        <p className="text-foreground/90">
                                            Payment processing may be handled by third-party payment providers.
                                            Bagalkidukaan does not store sensitive payment details such as card numbers.
                                        </p>
                                        <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                            <p className="text-foreground/90 font-medium">
                                                We are not responsible for payment provider failures or breaches.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    2
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">How We Use Your Information</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90">We use collected data to:</p>
                                <div className="grid gap-2">
                                    {[
                                        "Operate and maintain the Platform",
                                        "Verify Sellers and enforce the 5 km radius rule",
                                        "Enable transactions between Sellers and Customers",
                                        "Manage delivery options",
                                        "Display ratings and reviews",
                                        "Detect fraud, abuse, or policy violations",
                                        "Enforce bans, suspensions, and legal compliance",
                                        "Improve platform performance and security"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                                            <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
                                    <p className="text-foreground font-medium">
                                        If data is required to protect Bagalkidukaan legally or commercially, we will use it.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-destructive/30 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    3
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Location Data Usage</h2>
                                    <span className="inline-block mt-1 px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold uppercase rounded-full">Important</span>
                                </div>
                            </div>
                            <div className="ml-13 space-y-4">
                                <div className="space-y-3">
                                    {[
                                        {
                                            text: "Location data is used to restrict Seller operations within 5 km of the registered store",
                                            type: "info"
                                        },
                                        {
                                            text: "Manipulating or falsifying location data may result in immediate account termination",
                                            type: "danger"
                                        },
                                        {
                                            text: "Location tracking may occur even when the app is not actively used (where legally permitted)",
                                            type: "warning"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className={`p-4 rounded-xl border-l-4 ${item.type === 'danger' ? 'bg-destructive/10 border-destructive' :
                                            item.type === 'warning' ? 'bg-accent/10 border-accent' :
                                                'bg-primary/5 border-primary'
                                            }`}>
                                            <p className={`font-medium ${item.type === 'danger' ? 'text-destructive' : 'text-foreground/90'}`}>
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-destructive text-destructive-foreground rounded-xl">
                                    <p className="font-bold">⚠️ No location data = no selling.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    4
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Data Sharing & Disclosure</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90 font-medium">We may share your data:</p>
                                <div className="space-y-3">
                                    {[
                                        "With Customers or Sellers to complete transactions",
                                        "With service providers (hosting, analytics, payments)",
                                        "With law enforcement or government authorities when legally required",
                                        "To protect Bagalkidukaan from fraud, abuse, or legal claims"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
                                            <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 bg-primary/5 rounded-xl border-l-4 border-primary space-y-2">
                                    <p className="text-foreground font-medium">
                                        We do not sell personal data for advertising purposes.
                                    </p>
                                    <p className="text-foreground/90 text-sm">
                                        But we will disclose data if legally forced or strategically necessary to protect the Platform.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    5
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Ratings, Reviews & Public Data</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <div className="grid gap-3">
                                    {[
                                        {
                                            icon: (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                            ),
                                            text: "Ratings, reviews, store names, and product details are publicly visible"
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                                </svg>
                                            ),
                                            text: "Once published, this data may not be removable on request"
                                        },
                                        {
                                            icon: (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                            ),
                                            text: "Bad reviews, reports, and ratings may be stored indefinitely for enforcement purposes"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                                            <div className="shrink-0 text-primary mt-0.5">
                                                {item.icon}
                                            </div>
                                            <span className="text-foreground/90">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                    <p className="text-foreground font-semibold">You do not control public feedback.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    6
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Data Retention</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90">We retain user data:</p>
                                <ul className="space-y-3">
                                    {[
                                        "As long as the account exists",
                                        "After account termination if required for legal, security, or dispute reasons"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-foreground/90">
                                            <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                    <p className="text-destructive font-semibold">
                                        ⚠️ Deleting your account does not guarantee deletion of all data.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    7
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Data Security</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90">
                                    We use reasonable technical and organizational measures to protect data. However:
                                </p>
                                <div className="grid gap-3">
                                    {[
                                        { text: "No system is 100% secure", icon: "⚠️" },
                                        { text: "We do not guarantee absolute protection", icon: "🔒" },
                                        { text: "You use the Platform at your own risk", icon: "⚡" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-foreground/90 mt-0.5">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 8 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    8
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">User Rights</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90">Depending on applicable law, you may:</p>
                                <div className="grid gap-2">
                                    {[
                                        "Request access to your personal data",
                                        "Request correction of inaccurate data",
                                        "Request deletion (subject to legal and business constraints)"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                                            <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 bg-muted/50 rounded-xl border-l-4 border-primary">
                                    <p className="text-foreground/90 font-medium mb-3">We may reject requests that:</p>
                                    <ul className="space-y-2 ml-4">
                                        {[
                                            "Conflict with legal obligations",
                                            "Interfere with enforcement actions",
                                            "Harm platform integrity"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-foreground/90">
                                                <span className="text-destructive font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 9 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-destructive/30 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    9
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Seller-Specific Responsibilities</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90 font-medium">Sellers are responsible for:</p>
                                <div className="grid gap-2">
                                    {[
                                        "Lawful handling of customer data received through the Platform",
                                        "Not misusing customer contact information",
                                        "Not storing or exploiting customer data outside order fulfillment"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                                            <svg className="w-5 h-5 text-destructive mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-destructive text-destructive-foreground rounded-xl">
                                    <p className="font-bold">⚠️ Violation = immediate ban.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 10 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    10
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Cookies & Tracking</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90">We use cookies and similar technologies to:</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {[
                                        { icon: "🔐", text: "Maintain sessions" },
                                        { icon: "📊", text: "Analyze usage" },
                                        { icon: "⚡", text: "Improve functionality" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-foreground/90 font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                    <p className="text-foreground font-medium">
                                        Disabling cookies may break platform features. That&apos;s your problem, not ours.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 11 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    11
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Third-Party Links</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <p>
                                    Bagalkidukaan may contain links to third-party websites or services.
                                </p>
                                <div className="p-4 bg-accent/10 rounded-xl border-l-4 border-accent">
                                    <p className="font-medium">
                                        We are not responsible for their privacy practices. Use them at your own risk.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 12 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    12
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Policy Updates</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <p>We may update this Privacy Policy at any time.</p>
                                <p>Continued use of Bagalkidukaan after changes means acceptance.</p>
                                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                    <p className="font-medium">No individual notice is guaranteed.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 13 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    13
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Governing Law</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                                    <p className="font-medium">This Privacy Policy is governed by the laws of India.</p>
                                </div>
                                <p>Courts located in [Insert City/State] shall have exclusive jurisdiction.</p>
                            </div>
                        </section>

                        {/* Section 14 - Contact */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    14
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Contact Information</h2>
                            </div>
                            <div className="ml-13">
                                <p className="text-foreground/90 mb-4">For privacy-related concerns:</p>
                                <div className="p-5 bg-card rounded-xl border border-border shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Email us at:</p>
                                            <a href="mailto:business@bagalkidukaan.store" className="text-primary font-semibold hover:underline text-lg">
                                                business@bagalkidukaan.store
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Bottom Notice */}
                    <div className="mt-12 p-6 rounded-2xl bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <h3 className="text-xl font-bold text-foreground">Your Privacy Matters</h3>
                        </div>
                        <p className="text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                            By using Bagalkidukaan, you acknowledge that you have read and understood this Privacy Policy and agree to our data collection, use, and sharing practices.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-muted-foreground">
                                Want to review our terms?
                            </p>
                            <p className="text-foreground font-medium">Check out our legal documents</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/terms"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Terms & Conditions
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
