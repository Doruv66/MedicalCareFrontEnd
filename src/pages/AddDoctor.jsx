import React from 'react'
import style from './AddDoctor.module.css'
import { useUser } from '../components/Context/UserContext'

const AddDoctor = () => {
    const user = useUser();

    if (user === null) {
        return <Error401 />;
    } else if (user.accountType !== "ADMIN") {
        return <Error401 />;
    }

  return (
    <div>

        {/* on the left upload image component */}

        {/* on the right information form for doctor  */}

    </div>
  )
}

export default AddDoctor