import { volumeSlider, volumeDisplay } from 'volume-elements';

const text = typeof volumeDisplay.innerText === 'undefined' ? 'textContent' : 'innerText';
export default class VolumeController
{
    constructor(volume=50, muted=false)
    {
        this.volume = volume;
        this.muted = muted;

        this.updateDisplay( volumeDisplay );
        this.observe( volumeSlider );
    }

    observe( input )
    {
        input.addEventListener( 'change', ( { target } ) =>
        {
            this.volume = target.value;
            this.updateDisplay( volumeDisplay );
        } );
    }

    updateDisplay( span )
    {
        span[text] = `${this._volume} %`;
    }

    get volume()
    {
        return this._volume;
    }

    set volume( value )
    {
        if ( 0 <= value && value <= 100 )
        {
            this._volume = value;
        }
    }

    get muted()
    {
        return this._muted;
    }

    set muted( value )
    {
        this._muted = !!value;
    }
}
