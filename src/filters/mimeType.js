export default function mimeType(val) {
	let result;
	switch (val) {
		case "pdf":
		case "application/pdf":
			result = "pdf";
			break;
		case "word":
		case "doc":
		case "docx":
		case "application/msword":
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			result = "word";
			break;
		case "excel":
		case "xls":
		case "xlsx":
		case "application/vnd.ms-excel":
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
			result = "excel";
			break;
		case "ppt":
		case "pptx":
		case "application/vnd.ms-powerpoint":
		case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
			result = "ppt";
			break;
		case "txt":
		case "text/plain":
			result = "txt";
			break;
		case "png":
		case "jpg":
		case "jpeg":
		case "gif":
		case "webp":
		case "image/png":
		case "image/jpg":
		case "image/jpeg":
		case "image/gif":
		case "image/webp":
			result = "img";
			break;
		default:
			result = "unknown";
			break;
	}

	return result;
}
