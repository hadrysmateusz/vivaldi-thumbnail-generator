import { useContext } from "react"
import { GeneratorContext } from "./generator"
export const useSettings = () => useContext(GeneratorContext).settings
export const useUploader = () => useContext(GeneratorContext).uploader
export const useThumbnails = () => useContext(GeneratorContext).thumbnails
export const useExporter = () => useContext(GeneratorContext).exporter
export const useEditor = () => useContext(GeneratorContext).editor
