'use client'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | Bagalkidukaan",
    description: "Read our terms and conditions governing the use of Bagalkidukaan marketplace platform.",
};

export default function TermsAndConditionsPage() {
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Legal Agreement
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                            Terms and Conditions
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Please read these terms carefully before using Bagalkidukaan
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
                            These Terms and Conditions (&quot;Terms&quot;) govern access to and use of{" "}
                            <span className="font-semibold text-primary">Bagalkidukaan</span>{" "}
                            (<a href="https://www.bagalkidukaan.store" className="text-primary hover:underline font-medium">https://www.bagalkidukaan.store</a>)
                            (&quot;Platform,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
                        </p>
                        <p className="mt-4 text-foreground leading-relaxed">
                            By accessing or using the Platform as a Seller or Customer, you agree to be legally bound by these Terms.{" "}
                            <span className="font-semibold text-destructive">If you do not agree, do not use the Platform.</span>
                        </p>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    1
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Platform Overview</h2>
                            </div>
                            <div className="ml-13 space-y-4 text-foreground/90">
                                <p className="leading-relaxed">
                                    Bagalkidukaan is an online marketplace that allows independent sellers (&quot;Sellers&quot;) to list and sell products to customers located within a maximum radius of 5 kilometers from the Seller&apos;s registered physical store.
                                </p>
                                <div className="bg-muted/50 rounded-xl p-5 space-y-2 border-l-4 border-primary">
                                    <p className="font-semibold text-foreground">Bagalkidukaan:</p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive font-bold mt-1">✗</span>
                                            <span>Is not a seller</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive font-bold mt-1">✗</span>
                                            <span>Is not a delivery service</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive font-bold mt-1">✗</span>
                                            <span>Does not own or stock products</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm font-medium text-primary pt-2">✓ We only provide the technology platform.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    2
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Eligibility</h2>
                            </div>
                            <div className="ml-13 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Seller Eligibility</h3>
                                    <p className="text-foreground/90 mb-3">To register as a Seller, you must:</p>
                                    <ul className="space-y-2 ml-4">
                                        {[
                                            "Be legally permitted to sell goods under applicable laws",
                                            "Register a valid physical store location",
                                            "Provide accurate and complete business information",
                                            "Comply with all local, state, and national laws"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-foreground/90">
                                                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <p className="text-destructive font-semibold">⚠️ False information = immediate suspension.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Customer Eligibility</h3>
                                    <p className="text-foreground/90">
                                        Customers must be legally capable of entering into binding contracts.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    3
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Seller Obligations</h2>
                                    <span className="inline-block mt-1 px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold uppercase rounded-full">Strict</span>
                                </div>
                            </div>
                            <div className="ml-13 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Product Listings</h3>
                                    <p className="text-foreground/90 mb-3">
                                        Sellers may list any product permitted by law. The Seller is fully responsible for:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Product legality",
                                            "Product quality, safety, and authenticity",
                                            "Accurate descriptions, pricing, and images",
                                            "Stock availability"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                                                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm text-foreground/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <p className="text-destructive font-semibold">
                                            ⚠️ Bagalkidukaan does not verify products. If you sell illegal, counterfeit, or restricted items, you alone are liable.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">3.2 5 KM Radius Limitation</h3>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                                            <p className="text-foreground/90">
                                                Sellers may only sell to customers located within 5 km of their registered store
                                            </p>
                                        </div>
                                        <div className="p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-xl">
                                            <p className="text-destructive font-semibold">
                                                Any attempt to bypass, manipulate, or misrepresent location data may result in permanent account termination
                                            </p>
                                        </div>
                                        <p className="text-sm text-muted-foreground italic">No appeals guaranteed.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Delivery Responsibility</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>Delivery is optional and controlled entirely by the Seller</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>If a Seller enables the home delivery option, the Seller must deliver the product</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>Bagalkidukaan does not guarantee delivery</span>
                                        </li>
                                    </ul>
                                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <p className="text-destructive font-semibold">
                                            ⚠️ Failure to deliver after accepting an order will be treated as serious misconduct.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    4
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Ratings, Reviews & Reports</h2>
                            </div>
                            <div className="ml-13 space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">4.1 Ratings and Reviews</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>Customers may submit ratings and reviews based on real transactions</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <svg className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Sellers may not manipulate, fake, or pressure customers regarding reviews</span>
                                        </li>
                                    </ul>
                                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                        <p className="text-destructive font-semibold">⚠️ Fake reviews = suspension or ban.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">4.2 Reports and Enforcement</h3>
                                    <p className="text-foreground/90 mb-3">Sellers may face warnings, suspension, or permanent ban due to:</p>
                                    <div className="grid gap-2">
                                        {[
                                            "Consistently bad ratings",
                                            "Repeated negative reviews",
                                            "Verified customer complaints",
                                            "Fraud, abuse, or misrepresentation",
                                            "Failure to deliver orders"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                                                <svg className="w-5 h-5 text-destructive flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-foreground/90 text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-muted/50 rounded-xl border-l-4 border-primary">
                                        <p className="text-foreground font-semibold text-sm">
                                            Bagalkidukaan reserves the right to act without prior notice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-destructive/30 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    5
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Seller Ban & Termination</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90 font-medium">Bagalkidukaan may:</p>
                                <div className="grid gap-3">
                                    {[
                                        "Suspend or terminate Seller accounts",
                                        "Remove listings at any time",
                                        "Permanently block access to the Platform"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                                            <svg className="w-5 h-5 text-destructive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span className="text-foreground/90">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
                                    <p className="text-foreground/90 font-medium mb-3">Reasons include but are not limited to:</p>
                                    <ul className="space-y-2 ml-4">
                                        {["Policy violations", "Poor performance", "Customer harm", "Legal or reputational risk to Bagalkidukaan"].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-foreground/90">
                                                <span className="text-destructive font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 bg-destructive text-destructive-foreground rounded-xl">
                                    <p className="font-bold">⚠️ No compensation, refunds, or reinstatement are guaranteed.</p>
                                </div>
                            </div>
                        </section>

                        {/* Sections 6-8 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    6
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Orders, Payments & Disputes</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        <span>Bagalkidukaan may facilitate payments but is not responsible for disputes</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        <span>Sellers are responsible for refunds, replacements, and customer service unless stated otherwise</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold">•</span>
                                        <span>Bagalkidukaan may assist but is not obligated to resolve disputes</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-destructive/30 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    7
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Prohibited Activities</h2>
                            </div>
                            <div className="ml-13 space-y-4">
                                <p className="text-foreground/90 font-medium">Users may NOT:</p>
                                <div className="grid gap-2">
                                    {[
                                        "Sell illegal or restricted products",
                                        "Provide false information",
                                        "Manipulate ratings or reviews",
                                        "Harass customers or other sellers",
                                        "Circumvent the 5 km delivery limitation",
                                        "Abuse platform systems or features"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                                            <svg className="w-5 h-5 text-destructive flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-foreground/90 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                                    <p className="text-destructive font-semibold">⚠️ Violation = suspension or permanent ban.</p>
                                </div>
                            </div>
                        </section>

                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    8
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Limitation of Liability</h2>
                            </div>
                            <div className="ml-13 space-y-3">
                                <p className="text-foreground/90">To the maximum extent permitted by law:</p>
                                <div className="p-5 bg-muted/50 rounded-xl border-l-4 border-primary space-y-3">
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>Bagalkidukaan is not liable for product quality, delivery failures, or disputes</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>We are not responsible for Seller or Customer actions</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-foreground/90">
                                            <span className="text-primary font-bold">•</span>
                                            <span>Use of the Platform is at your own risk</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Sections 9-12 */}
                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    9
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Indemnification</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <p>Sellers agree to indemnify and hold harmless Bagalkidukaan from:</p>
                                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                                    {["Legal claims", "Losses", "Damages", "Government penalties"].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                                            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm pt-2">arising from Seller actions, products, or violations of law.</p>
                            </div>
                        </section>

                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    10
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Changes to Terms</h2>
                            </div>
                            <div className="ml-13 text-foreground/90">
                                <p className="leading-relaxed">
                                    Bagalkidukaan may update these Terms at any time. Continued use of the Platform means acceptance of the updated Terms.
                                </p>
                            </div>
                        </section>

                        <section className="group p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    11
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Governing Law & Jurisdiction</h2>
                            </div>
                            <div className="ml-13 space-y-3 text-foreground/90">
                                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                                    <p className="font-medium">These Terms are governed by the laws of India.</p>
                                </div>
                                <p>Courts located in [Insert City/State] shall have exclusive jurisdiction.</p>
                            </div>
                        </section>

                        <section className="group p-6 sm:p-8 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                    12
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mt-1">Contact Information</h2>
                            </div>
                            <div className="ml-13">
                                <p className="text-foreground/90 mb-4">For legal or policy-related inquiries:</p>
                                <div className="p-5 bg-card rounded-xl border border-border shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Email us at:</p>
                                            <a href="mailto:legal@bagalkidukaan.store" className="text-primary font-semibold hover:underline text-lg">
                                                legal@bagalkidukaan.store
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h3 className="text-xl font-bold text-foreground">Important Notice</h3>
                        </div>
                        <p className="text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                            By continuing to use Bagalkidukaan, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
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
                                Have questions about our terms?
                            </p>
                            <p className="text-foreground font-medium">We&apos;re here to help</p>
                        </div>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
