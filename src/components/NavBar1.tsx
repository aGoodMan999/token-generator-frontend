import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import HAMBURGER_ICON from "../assets/menu.png";


type LinkItem = {
    name: string;
    ref: string;
    icon?: string;
}

const NAVBAR_LINK_ITEMS: LinkItem[] = [
    { name: 'CODE GENERATOR', ref: '/' },
    { name: 'DEPLOYMENT', ref: '/deployment' },
    { name: 'CONTACT', ref: '/contact' }
]

const NavBar1 = () => {
    const { connectWallet } = useContext(AccountContext);
    const Menu = (e: React.MouseEvent<HTMLImageElement>) => {
        let list = document.querySelector('ul');
        console.log(list);
        e.currentTarget.id === 'menu' ? (e.currentTarget.id = "close", list?.classList.add('abcasdfasdfasdf'), list?.classList.add('opacity-100')) : (e.currentTarget.id = "menu", list?.classList.remove('top80px]'), list?.classList.remove('opacity-100'))

    }

    return (
        <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center ">
                <span className="text-2xl font-[Poppins] cursor-pointer">
                    <img className="h-10 inline"
                        src="https://www.shutterstock.com/image-vector/bandung-indonesia-18-november-2023-600nw-2389904571.jpg" />
                    TOKEEN</span>

                <span className="text-3xl cursor-pointer mx-2 md:hidden block">
                    {/* <ion-icon ></ion-icon> */}
                    <img onClick={Menu} src={HAMBURGER_ICON} className="w-16"></img>
                </span>
            </div>

            <ul id='menu' className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                {NAVBAR_LINK_ITEMS.map((item, index) => (
                    <Link to={item.ref} key={index} className="mx-4 my-6 md:my-0">
                        <a href="#" className="text-xl hover:text-cyan-500 duration-500">{item.name}</a>
                    </Link>
                ))}
                <button onClick={connectWallet} className="bg-cyan-400 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
                    Get started
                </button>
                <h2 className=""></h2>
            </ul>
        </nav>
    )
}
export default NavBar1;