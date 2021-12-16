import {Fragment} from 'react';
import Banner from '../components/Banner';
// import CourseCard from '../components/CourseCard';
import Highlights from '../components/Highlights';


export default function Home (){

	const data={
		title: "Mingming's Magic Shop",
		content: "Your Superhero's Wizardy Emporium",
		destination: "/",
		label: "Buy now!"
	}


	return(
		<Fragment>
			<Banner data={data} />
			<Highlights/>
			{/*<ProductCard/>*/}
		</Fragment>
	)
}
