import React from 'react';

import "./Fotografije.css";

let slike = [
    'https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238599.jpg',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlc2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.unsplash.com/photo-1610085927744-7217728267a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238599.jpg',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlc2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.unsplash.com/photo-1610085927744-7217728267a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
];
const Fotografije =()=>{
    return(
        <div className="divFotografije">
            <div className="divCeoFotografije">
                <div className="divNaslov">
                    <h1>Fotografije</h1>
                </div>
                <div className="divDoleFoto">
                    {slike.map(slika => (
                            <div className="divFoto"><img src={slika} alt="" /></div>
                    ))}
                </div>

            </div>
            </div>
    )
}

export default Fotografije;