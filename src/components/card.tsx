

const Card: React.FC<ProductCardProps> = ({ title, description, price, image, }) => {
    return (
        <>
            <div className='p-4 m-2 bg-white shadow-md rounded w-full'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-gray-700'>{description}</p>
                <p className='text-green-600'>${price}</p>
                <img src={image} alt={title} className='w-32 h-32 object-cover' />
            </div>
        </>
    )
}

export default Card