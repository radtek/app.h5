import Cell from "./src/cell.vue";
import CellAvatar from "./src/cell-avatar.vue";

import CellSkeleton from "./src/cell-skeleton";
import CellSkeletonSimple from "./src/cell-skeleton.simple";
import CellAvatarSkeleton from "./src/cell-avatar-skeleton";

Cell.install = function(Vue) {
	Vue.component(Cell.name, Cell);
};

Cell.Skeleton = CellSkeleton;
Cell.SkeletonSimple = CellSkeletonSimple;

Cell.Skeleton.install = function(Vue) {
	Vue.component(Cell.Skeleton.name, Cell.Skeleton);
};
Cell.SkeletonSimple.install = function(Vue) {
	Vue.component(Cell.SkeletonSimple.name, Cell.SkeletonSimple);
};

CellAvatar.install = function(Vue) {
	Vue.component(CellAvatar.name, CellAvatar);
};
CellAvatar.Skeleton = CellAvatarSkeleton;
CellAvatar.Skeleton.install = function(Vue) {
	Vue.component(CellAvatar.Skeleton.name, CellAvatar.Skeleton);
};

export { Cell, CellAvatar };
