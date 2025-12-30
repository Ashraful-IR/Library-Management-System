import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-0 mb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-600 text-sm">
                            Library Management System - Your trusted platform for managing library resources efficiently.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Home</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Catalog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">My Account</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Reservations</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">FAQs</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Report Issue</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Accessibility</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm mb-4 md:mb-0">
                            &copy; {currentYear} Library Management System. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;