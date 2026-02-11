import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { allContent } from '../../utils/local-content';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';

export default function Positions({ site }) {
    const [activeTab, setActiveTab] = useState('internships');

    const internships = [
        {
            title: 'Cybersecurity Intern',
            type: 'Internship',
            location: 'Remote',
            duration: 'Flexible',
            description: 'Remote cybersecurity internship for students and early-career professionals. Work on real security projects including detection engineering, compliance documentation, and cloud security.',
            applyUrl: 'mailto:careers@elysiumcyber.com'
        }
    ];

    return (
        <>
            <Head>
                <title>Open Positions | Elysium Cyber</title>
                <meta name="description" content="View open positions at Elysium Cyber. Join our team and build your cybersecurity career." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>

            <div className="sb-page">
                <div className="sb-base sb-default-base-layout bg-light">
                    {site.header && <Header {...site.header} enableAnnotations={false} />}

                    <main id="main">
                        {/* Hero Section */}
                        <section className="bg-light py-16 md:py-24">
                            <div className="max-w-7xl mx-auto px-4 md:px-16">
                                <h1 className="text-4xl md:text-5xl font-normal text-dark mb-4">
                                    Open Positions
                                </h1>
                                <p className="text-lg text-dark/70">
                                    Find your next opportunity with Elysium Cyber.
                                </p>
                            </div>
                        </section>

                        {/* Filter Tabs */}
                        <section className="bg-light border-b border-neutralAlt">
                            <div className="max-w-7xl mx-auto px-4 md:px-16">
                                <div className="flex gap-0">
                                    <button
                                        onClick={() => setActiveTab('full-time')}
                                        className={`px-6 py-4 text-base font-medium transition-colors relative ${
                                            activeTab === 'full-time'
                                                ? 'text-dark'
                                                : 'text-dark/50 hover:text-dark/70'
                                        }`}
                                    >
                                        Full-Time
                                        {activeTab === 'full-time' && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('internships')}
                                        className={`px-6 py-4 text-base font-medium transition-colors relative ${
                                            activeTab === 'internships'
                                                ? 'text-dark'
                                                : 'text-dark/50 hover:text-dark/70'
                                        }`}
                                    >
                                        Internships
                                        {activeTab === 'internships' && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Job Listings */}
                        <section className="bg-light py-12 md:py-16 min-h-[400px]">
                            <div className="max-w-7xl mx-auto px-4 md:px-16">
                                {activeTab === 'full-time' && (
                                    <div className="bg-neutral rounded-xl p-8 md:p-12 text-center">
                                        <div className="max-w-md mx-auto">
                                            <svg
                                                className="w-16 h-16 mx-auto mb-6 text-dark/30"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <h2 className="text-xl font-medium text-dark mb-3">
                                                No Full-Time Positions Available
                                            </h2>
                                            <p className="text-dark/70 mb-6">
                                                We're not currently hiring for full-time roles. Send your resume to get notified when positions open up.
                                            </p>
                                            <a
                                                href="mailto:careers@elysiumcyber.com"
                                                className="inline-flex items-center gap-2 text-dark font-medium hover:underline"
                                            >
                                                careers@elysiumcyber.com
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'internships' && (
                                    <div className="space-y-4">
                                        {internships.map((job, index) => (
                                            <div
                                                key={index}
                                                className="bg-neutral rounded-xl p-6 md:p-8 transition-shadow hover:shadow-md"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h2 className="text-xl md:text-2xl font-medium text-dark mb-2">
                                                            {job.title}
                                                        </h2>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dark/5 text-dark/70">
                                                                {job.type}
                                                            </span>
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dark/5 text-dark/70">
                                                                {job.location}
                                                            </span>
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-dark/5 text-dark/70">
                                                                {job.duration}
                                                            </span>
                                                        </div>
                                                        <p className="text-dark/70 leading-relaxed">
                                                            {job.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <Link
                                                            href={job.applyUrl}
                                                            className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-light rounded font-medium hover:bg-dark/90 transition-colors"
                                                        >
                                                            Apply Now
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </main>

                    {site.footer && <Footer {...site.footer} enableAnnotations={false} />}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const data = allContent();
    return {
        props: {
            site: data.props.site
        }
    };
}
