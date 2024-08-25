import './index.css'

const MatrixBox=(props)=>{
    const {details, handleClick}=props;
    const {boxCount, isclicked, changeorange}=details
    const changecolor=()=>{
        handleClick(boxCount);
    }

    const isgreen= changeorange ? 'fillorange': (isclicked? 'fillgreen' :'')

    return (
        <button className={`${isgreen} button`} type='button' onClick={changecolor}>
            {boxCount}
        </button>
    )
}

export default MatrixBox