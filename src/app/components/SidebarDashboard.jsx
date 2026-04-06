import { MdOutlineDashboard, MdMessage, MdLeaderboard } from "react-icons/md";
import { FaBlog, FaCalculator, FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdContacts, IoIosSettings, IoMdLogOut } from "react-icons/io";

const SidebarDashboard = () => {
    return (
        <div>
            <div class="position-sticky mt-3">
                <div className="usercard">
                    <center>
                        <img src="/images/user-icons.svg" width={70} alt="user" />
                        <h6 className="pt-3 text-white">Suhail Siddiqui</h6>
                        <p className="text-white team_description">Suhail@gmail.com</p>
                    </center>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">
                            <MdOutlineDashboard className="dashboard_icon" /> Dashboard
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <IoHomeOutline className="dashboard_icon pe-2" />
                            Home Page
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <FaBlog className="dashboard_icon pe-2" />
                            Blogs
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <FaCalculator className="dashboard_icon pe-2" />
                            Estimater
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <FaRegUser className="dashboard_icon pe-2" />
                            Users
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <IoMdContacts className="dashboard_icon pe-2" />
                            Contact Us
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <MdMessage className="dashboard_icon pe-2" />
                            Queries
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <MdLeaderboard className="dashboard_icon pe-2" /> Leads
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <IoIosSettings className="dashboard_icon pe-2" /> Settings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <IoMdLogOut className="dashboard_icon pe-2" />
                            Log Out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarDashboard;
