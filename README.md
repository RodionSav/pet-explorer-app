# Pet Breed Explorer

## Overview
**Pet Breed Explorer** is a web application built using Next.js, TypeScript, and Tailwind CSS. The application displays a list of random cat and dog breeds on the homepage, with each breed represented as a card containing an image and the breed name. Users can click on a breed card to navigate to a detailed breed page, which provides more information about the breed and displays a gallery of images of that breed.

## Tech Stack
- **Frontend Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs Used**:
  - [The Dog API](https://thedogapi.com)
  - [The Cat API](https://thecatapi.com)

## Features

### Homepage
- Displays a list of random dog and cat breeds fetched from The Dog API and The Cat API.
- Each breed is presented as a card containing:
  - An image of the breed.
  - The name of the breed.
- Responsive design implemented using Tailwind CSS.

### Breed Page
- Each breed card on the homepage links to a dynamic breed page.
- The breed page provides:
  - Detailed information about the breed (if available).
  - A gallery of images of different animals of that breed.
- The breed data and images are fetched dynamically based on the breed selected.


## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/pet--explorer-app.git
   cd pet-breed-explorer
   npm install
   
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
