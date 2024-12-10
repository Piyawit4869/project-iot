import Link from 'next/link';
import React from 'react';

export const Breadcrumb = () => {
  const router = window.location;
  const [pathSegments, setPathSegments] = React.useState<string[]>([]);

  // Update breadcrumbs whenever the path changes
  React.useEffect(() => {
    const segments = router.pathname.split('/').filter((segment) => segment);
    setPathSegments(segments);
  }, [router.pathname]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray hover:text-primary"
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
              <path d="M5.5 8.5L10 13l4.5-4.5" />
            </svg>
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumb Links */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="inline-flex items-center">
              {/* Separator Icon */}
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.293 16.293a1 1 0 010-1.414L13.586 10 8.293 5.707a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>

              {isLast ? (
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {segment}
                </span>
              ) : (
                <Link
                  href={href}
                  className="ml-1 text-sm font-medium text-gray hover:text-primary md:ml-2"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
