FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
);

const width = 1000;
const height = 500;
const ratio = height / width;

FilePond.setOptions({
    stylePanelAspectRatio: ratio,
    imageResizeTargetWidth: 1000,
    imageResizeTargetHeight: 500
});

FilePond.parse(document.body);