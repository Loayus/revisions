const images = import.meta.glob(
    '/src/assets/qcm-images/**/*.png',
    {eager: true}
)

export const imageMap = Object.entries(images).reduce((acc, [path, module]) => {
    const filename = path.split('/').pop()
    console.log(`${filename} =>`, module.default) // 👈 DEBUG
    acc[filename] = module.default
    return acc
}, {})

export const getImageUrl = (imageName) => {
    const url = imageMap[imageName]
    console.log(`getImageUrl('${imageName}') =>`, url) // 👈 DEBUG
    return url
}