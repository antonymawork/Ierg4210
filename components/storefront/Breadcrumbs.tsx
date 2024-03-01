// components/storefront/Breadcrumbs.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const { asPath } = router;
  
  // Split the path into segments and remove any empty strings
  const pathSegments = asPath.split('/').filter(Boolean);

  // Always include a "Home" breadcrumb
  const breadcrumbs = [{ href: "/", displayName: "Home", isClickable: asPath !== "/" }];

  // Append other breadcrumbs, skipping "categories" in the display name
  pathSegments.forEach((segment, index) => {
    if (segment !== "categories") { // Skip "categories" in breadcrumb display
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const displayName = decodeURIComponent(segment);
      const isClickable = index < pathSegments.length - 1;
      breadcrumbs.push({ href, displayName, isClickable });
    }
  });

  return (
    <nav className="bg-slate-200 p-3 text-sm">
      <ol className="list-reset flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <li className="mx-2">{'>'}</li>} {/* Separator */}
            <li>
              {breadcrumb.isClickable ? (
                <Link href={breadcrumb.href} legacyBehavior><a className="text-slate-600 hover:text-slate-500 uppercase">{breadcrumb.displayName}</a></Link>
              ) : (
                <span className="text-slate-600 uppercase">{breadcrumb.displayName}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
