/* eslint-disable no-unused-vars */
import react from 'react'
const Order = ({ order, ts }) => {

    const convertDate = (ts) => {
        // Input timestamp
        const timestamp = ts;

        // Parse the timestamp
        const date = new Date(timestamp);

        // Months array to convert numeric month to its corresponding name
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Get day, month, year, hours, and minutes
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Function to add ordinal suffix to the day
        const addOrdinalSuffix = (day) => {
            if (day >= 11 && day <= 13) {
                return day + 'th';
            } else {
                switch (day % 10) {
                    case 1: return day + 'st';
                    case 2: return day + 'nd';
                    case 3: return day + 'rd';
                    default: return day + 'th';
                }
            }
        };

        // Format the date and time
        const formattedDate = `${addOrdinalSuffix(day)} ${month} ${year}, ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        // console.log(formattedDate); // Output: 5th March 2024, 18:33

    }

    const getPrice = () => {
        let price = 0;
        order?.forEach((item) => {
            price += (item.price * item.qty)
        })
        return price
    }

    return (
        <div>
            <hr />
            <div className="card mt-4 mb-4">
                <div className="card-header">
                    {convertDate(ts)}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Total Billing price: Rs. <b> <i>{getPrice()}/-</i></b></h5>
                    <hr />
                    <ul>
                        {
                            order?.map((item, index) => {
                                return (
                                    <li key={index}><b>{item.qty}</b> X {item.name}..... Rs. <b>{item.qty*item.price}</b>/-</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <hr />

        </div>
    )
}

export default Order