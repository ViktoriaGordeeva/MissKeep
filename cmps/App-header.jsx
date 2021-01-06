
const {NavLink ,withRouter } = ReactRouterDOM



function _AppHeader (){
    return (
    <div className ="navigation-color">

        <header className="main-header">

            <div className="navigation-header-logo noselect">AppSus</div>

                <ul className="navigation-links noselect">

                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/mister-email">Email</NavLink></li>
                    <li><NavLink to="/miss-keep">Keep</NavLink></li>
                    <li><NavLink to="/book">Books</NavLink></li>
                </ul>

        </header>

    </div>

    )

}


export const AppHeader = withRouter(_AppHeader)