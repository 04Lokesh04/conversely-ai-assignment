import './index.css'
import { useState} from 'react'
import MatrixBox from '../MatrixBox'

const Matrix=()=>{
    const boxdata=[{id:1, boxCount:1, isclicked:false, changeorange:false},
        {id:2, boxCount:2, isclicked:false, changeorange:false},
        {id:3, boxCount:3, isclicked:false, changeorange:false},
        {id:4, boxCount:4, isclicked:false, changeorange:false},
        {id:5, boxCount:5, isclicked:false, changeorange:false},
        {id:6, boxCount:6, isclicked:false, changeorange:false},
        {id:7, boxCount:7, isclicked:false, changeorange:false},
        {id:8, boxCount:8, isclicked:false, changeorange:false},
        {id:9, boxCount:9, isclicked:false, changeorange:false}
    ]
    const [boxes, setBoxes]=useState(boxdata);

    const handleClicks=(boxCount)=>{
        if (boxCount !==9){
            const updatebox=boxes.map(each=>
                each.boxCount===boxCount? {...each, isclicked:true}:each
            )
            setBoxes(updatebox)
        }
        else if (boxCount === 9) {
            const updatedBoxes = boxes.map((each) => {
                if (each.isclicked || each.boxCount === 9) {
                    return { ...each, changeorange: true }
                } else {
                    return each
                }
            });
            setBoxes(updatedBoxes);
        }
    }


    return (
        <div className='maincontainer'>
            <div className='matrixcontainer'>
                {boxes.map(each=>(
                    <MatrixBox details={each} key={each.id}  handleClick={handleClicks}/>
                ))}
            </div>
        </div>
    )

}

export default Matrix