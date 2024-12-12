import CategoriesPage from "@/components/home/CategoriesPage";
import HomePage from "@/components/home/HomePage";
import ProductPage from "@/components/home/ProductPage";
import SubscribeSection from "@/components/home/SubscribeSection";

export default function Home() {
  return (
   <>
    <HomePage/>
    <CategoriesPage/>
    <ProductPage/>
   
    <SubscribeSection/>
   </>
  )
}
