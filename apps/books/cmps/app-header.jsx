
const {NavLink ,withRouter } = ReactRouterDOM

function _AppHeader (){
    return (
        <div className="navigation-links-header">

            <div className="navigation-links-home"><NavLink exact to="/">Home</NavLink></div>
            <div className="navigation-links-book"><NavLink to="/book">Books</NavLink></div>
            <div><NavLink to="/About">About</NavLink></div>
        </div>
    )

}


export const AppHeader = withRouter(_AppHeader)