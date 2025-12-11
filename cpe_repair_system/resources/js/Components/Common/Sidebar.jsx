import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Sidebar({ user, navItems }) {
    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed">
            <div className="h-16 flex items-center justify-center border-b border-gray-200">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.route === '#' ? '#' : route(item.route)}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${item.active
                                        ? 'bg-yellow-50 text-yellow-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                        {user.first_name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
