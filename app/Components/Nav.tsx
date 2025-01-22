import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="w-full bg-transparent font-FunnelDisplayRegular flex justify-between items-center px-20 py-12">
      {/* Logo Section */}
      <div className="text-xl font-extrabold tracking-wide text-white">
        WebMinds
      </div>

      {/* Navigation Links */}
      <nav className="flex ">
        <ul className="flex items-center space-x-16 text-sm font-normal text-white">
          <li>
            <Link
              href="/"
              className="hover:text-blue-500 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/works"
              className="hover:text-blue-500 transition duration-200"
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              href="/expertise"
              className="hover:text-blue-500 transition duration-200"
            >
              Experties
            </Link>
          </li>
          <li>
            <Link
              href="/career"
              className="hover:text-blue-500 transition duration-200"
            >
              Carrer
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
