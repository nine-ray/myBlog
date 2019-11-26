import React, {Component} from 'react'
import adUtil from '../util/ad'



class AdView extends Component {
    state = {activeItem: 'home'}

    componentDidMount() {
        adUtil()
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default AdView
