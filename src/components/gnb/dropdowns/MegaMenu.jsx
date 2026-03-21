import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.scss';

const MegaMenu = ({ item, onClose, onMouseEnter }) => {
    if (!item.children) return null;

    // 상단 4개 + 하단 2개 분리
    const topCategories = item.children.slice(0, 4);
    const bottomCategories = item.children.slice(4);

    const renderColumn = (category) => (
        <div className="mega-menu__column" key={category.label}>
            <Link
                to={category.path}
                className="mega-menu__category-title"
                onClick={onClose}
            >
                {category.label}
            </Link>
            {category.children && (
                <ul className="mega-menu__sub-list" role="menu">
                    {category.children.map((sub) => (
                        <li key={sub.label} role="none">
                            <Link
                                to={sub.path}
                                className="mega-menu__sub-link"
                                role="menuitem"
                                onClick={onClose}
                            >
                                {sub.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div
            className="mega-menu"
            role="menu"
            onMouseEnter={onMouseEnter}
        >
            <div className="mega-menu__inner">
                <div className="mega-menu__top-row">
                    {topCategories.map(renderColumn)}
                </div>
                {bottomCategories.length > 0 && (
                    <>
                        <hr className="mega-menu__divider" />
                        <div className="mega-menu__bottom-row">
                            {bottomCategories.map(renderColumn)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MegaMenu;
