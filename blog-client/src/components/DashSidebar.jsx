import React, { useState, useEffect } from "react";
import { useLocation ,Link} from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";

export default function DashSidebar() {
  let location = useLocation();
  let [tab, setTab] = useState("");
  useEffect(() => {
    let urlParams = new URLSearchParams(location.search);
    let tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         <Link to="/dashboard?tab=profile">
            <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"User"}
                labelColor="dark"
            >
                Profile
            </Sidebar.Item>
          </Link>
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
