// import cookies from 'next-cookies';

// export default function handler(req, res) {
//   // Get the token and role from the cookies
//   const { token, role } = cookies(req);

//   // Perform your checks here. For example:
//   if (!token) {
//     res.status(401).json({ message: 'No token provided' });
//     return;
//   }

//   // Define the routes that each role can access
//   const clientRoutes = ["/client-bank", "/client-documents"];
//   const keeperRoutes = ["/keeper-bank", "/keeper-documents"];

//   // Check if the user's role matches the required role for the route they're trying to access
//   if (
//     (role === "client" && !clientRoutes.includes(req.body.pathname)) ||
//     (role === "keeper" && !keeperRoutes.includes(req.body.pathname))
//   ) {
//     res.status(403).json({ message: 'No rights to access this route' });
//     return;
//   }

//   // If everything is okay, send a success response
//   res.status(200).json({ message: 'Access granted' });
// }