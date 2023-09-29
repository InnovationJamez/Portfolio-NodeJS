FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
);

FilePond.setOptions({
    imageResizeTargetWidth: 500,
    imageResizeTargetHeight: 500
});

FilePond.parse(document.body);