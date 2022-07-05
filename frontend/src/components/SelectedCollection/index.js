import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getCollection } from '../../store/collections'
import { getImages } from "../../store/images";


function SelectedCollection() {
  const { id } = useParams();
  const dispatch = useDispatch()


  const images = useSelector(state => { return Object.values(state.images) });



  useEffect(() => {
    dispatch(getCollection(Number(id)))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

  return (
    <div className="target-collections-container-div">
      <div>
        {images.map((_, idx) => {
          return (
            <div key={idx}>
            </div>
          )
        })}
        <h2>{id}</h2>
      </div>
    </div>
  )
}

export default SelectedCollection;
