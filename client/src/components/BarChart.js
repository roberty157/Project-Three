// import React from 'react'
// import { Bar } from 'react-chartjs-2'
// import { Container } from 'react-bootstrap'
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import Search from '../pages/Search';

// const BarChart = () => {
//     const { loading, data } = useQuery(QUERY_ME);
//     const userData = data?.me || {};
//     console.log(userData);


//     return (
//         <Container className='p-2'>

//             <Bar
//                 data={{
//                     labels: ['Healthcare', 'Taxation', 'Education', 'Housing', 'Living', 'Safety', 'Environment', 'Economy'],
//                     datasets: [
//                         {
//                             label: 'Score',
//                             data: [`${city.healthcare}`, `${city.taxation}`, `${city.education}`, `${city.housing}`, `${city.costOfLiving}`, `${city.safety}`, `${city.environmentalQuality}`, `${city.economy}`],

//                             backgroundColor: [
//                                 'rgba(255, 99, 132, 0.2)',
//                                 'rgba(54, 162, 235, 0.2)',
//                                 'rgba(255, 206, 86, 0.2)',
//                                 'rgba(75, 192, 192, 0.2)',
//                                 'rgba(153, 102, 255, 0.2)',
//                                 'rgba(255, 159, 64, 0.2)'
//                             ],
//                             borderColor: [
//                                 'rgba(255, 99, 132, 1)',
//                                 'rgba(54, 162, 235, 1)',
//                                 'rgba(255, 206, 86, 1)',
//                                 'rgba(75, 192, 192, 1)',
//                                 'rgba(153, 102, 255, 1)',
//                                 'rgba(255, 159, 64, 1)'
//                             ],
//                             borderWidth: 1
//                         }]
//                 }}
//                 height={100}
//                 width={250}
//                 options={{
//                     responsive: true,
//                     maintainAspectRatio: true,
//                     scales: {
//                         y: {
//                             suggestedMin: 0,
//                             suggestedMax: 10
//                         }
//                     }
//                 }}
//             />
//         </Container>

//     )
// }


// export default