# 3D Animation with GSAP, Three.js, and Framer Motion in Next.js

This repository demonstrates how to create a 3D animation using GSAP and Three.js, and implement animated routing using Framer Motion in a Next.js application.

## Features

- **3D Model Rendering:** Renders a cold drink can that can be rotated using mouse scroll.
- **Interactive Animation:** Navigates to another static page with an animation when the cap of the cold drink is clicked.
- **Animated Routing:** Utilizes Framer Motion for smooth page transitions.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [GSAP](https://greensock.com/gsap/)
- [Framer Motion](https://www.framer.com/motion/)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/meetamjadsaeed/gsap-threejs-framer.git
   cd gsap-threejs-framer
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Directory Structure

```
/public
  /models
    - can.obj
/pages
  - index.js
  - about.js
/components
  - ColdDrink.js
```

## Usage

### Importing Components

To use the 3D model component, import it into your page:

```jsx
import ColdDrink from "../components/ColdDrink";

const HomePage = () => (
  <div>
    <ColdDrink />
    <div id="trigger">Scroll to rotate the can</div>
  </div>
);

export default HomePage;
```

### Customizing the 3D Model

The 3D model (`can.obj`) can be replaced with any other model. Place your model in the `public/models` directory and update the path in `ColdDrink.js`.

## Demo
![Demo Video](https://youtu.be/qt6FOVpoMiE)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/docs/)
