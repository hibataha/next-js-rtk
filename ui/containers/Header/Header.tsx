import { PAGETYPE } from "../../../models/interfaces";

interface HeaderProps {
    type: PAGETYPE;
}
const Header = ({type}: HeaderProps) => {
    return (
        <header>{type === PAGETYPE.POST ? 'POST' : type === PAGETYPE.Courses ? 'COURSES': 'ARTICLE'} MANAGER</header>
    )
};

export default Header;