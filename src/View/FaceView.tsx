import * as React from 'react'
import {GameStateType} from '../ViewModel/GameStateType'
import './Face.css'

const Faces = [
    require('./Asset/picking.png'),
    require('./Asset/picking.png'),
    require('./Asset/moving.png'),
    require('./Asset/dying.png'),
    require('./Asset/dead.png'),
    require('./Asset/win.png')
];

interface IFaceProps {
    stateType: GameStateType;
}

export default class FaceView extends React.Component<IFaceProps, any>{
 
    public render() {      
        return ( <section className="Face" style={this.image_style(this.props.stateType)}/> );  
    }

    private image_style(imageIndex: number) {
        const img = Faces[imageIndex];
        return { backgroundImage: "url(" + img + ")"};
    }

}