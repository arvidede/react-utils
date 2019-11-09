class ProgressBar extends Component {
    state = {
        scrollRate: 0,
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll)
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll)
    // }

    // handleScroll = event => {
    //     const scrollMax = document.body.offsetHeight - window.innerHeight
    //     const progress = Math.ceil((100 * window.scrollY) / scrollMax)
    //     this.setState({ scrollRate: progress })
    //     console.log(window.scrollY)
    // }

    render() {
        const style = {
            width: `${this.state.scrollRate}%`,
        }

        return <div style={style} className="progress-bar" />
    }
}
