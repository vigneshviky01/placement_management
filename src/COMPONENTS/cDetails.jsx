import React from 'react';

function cDetails(props) {
    return (
        <tr className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{props.Sno}</td>
            <td className="border border-gray-300 px-4 py-2">{props.name}</td>
            <td className="border border-gray-300 px-4 py-2">{props.criteria}</td>
            <td className="border border-gray-300 px-4 py-2">{props.date}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex  justify-around">
                    <img
                        src="/info.png"
                        alt="Info"
                        width={20}
                        className="cursor-pointer hover:opacity-50"
                        onClick={props.info}
                    />
                    <img
                        src="/edit.png"
                        alt="Edit"
                        width={20}
                        className="cursor-pointer hover:opacity-50"
                        onClick={props.updatec}
                    />
                    <img
                        src="/delete.png"
                        alt="Delete"
                        width={20}
                        className="cursor-pointer hover:opacity-50"
                        onClick={props.deletec}
                    />
                </div>
            </td>
        </tr>
    );
}

export default cDetails;