import React from "react";
import Navigation from "../Navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export const BaseLayout = (props: LayoutProps) => {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </>
    );    
};
