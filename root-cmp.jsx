// import {Home} from './pages/Home.jsx'
import {About} from './pages/About.jsx'
import {MailApp} from './apps/gmail/MailApp.jsx'
import {KeepApp} from './apps/keep/KeepApp.jsx'
import {AppHeader} from './cmps/App-header.jsx'
import {BookReview} from './apps/books/pages/book-review.jsx'
import {BookApp} from './apps/books/pages/book-app.jsx'



const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export function App() {
    
    return (
<Router>

    <section className="app">
        <AppHeader />
        <Switch>
            <Route path="/book/reviews/:bookId?" component={BookReview}/>
            <Route path="/book" component={BookApp}/>
            <Route path="/mister-email" component={MailApp} />
            <Route path="/miss-keep" component={KeepApp} />
            <Route path="/" component={About} />
        </Switch>






    </section>

</Router>
    )
}












