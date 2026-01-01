"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { khoanThuApi } from "@/lib/api/khoanthu";
import { KhoanThu, KhoanThuDetail } from "@/lib/types/fee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, DollarSign, Calendar, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FeeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const feeId = Number(params.id);

  const [detail, setDetail] = React.useState<KhoanThuDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await khoanThuApi.getChiTiet(feeId);
        setDetail(data);
      } catch (error) {
        console.error("Failed to fetch fee details:", error);
        toast.error("Không thể tải thông tin khoản thu");
      } finally {
        setIsLoading(false);
      }
    };

    if (feeId) {
      fetchData();
    }
  }, [feeId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 py-6 px-12">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex flex-col gap-6 py-6 px-12">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-destructive">
          <h2 className="text-lg font-semibold mb-2">Không tìm thấy khoản thu</h2>
          <p>Khoản thu với ID {feeId} không tồn tại.</p>
        </div>
      </div>
    );
  }

  const { khoanThu, hoDaDong, hoChuaDong, tongTienDaThu, soHoDaDong, soHoChuaDong } = detail;
  const isMandatory = khoanThu.loaiKhoanThu === 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6 py-6 px-12">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/fees")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{khoanThu.tenKhoanThu}</CardTitle>
                <CardDescription>Chi tiết thông tin khoản thu</CardDescription>
              </div>
              <Badge variant={isMandatory ? "destructive" : "default"} className="text-sm">
                {isMandatory ? "Bắt buộc" : "Tự nguyện"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Đơn giá</p>
                  <p className="text-base font-semibold">{formatCurrency(khoanThu.donGia)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng đã thu</p>
                  <p className="text-base font-semibold text-green-600">{formatCurrency(tongTienDaThu)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hộ đã đóng</p>
                  <p className="text-base font-semibold">{soHoDaDong} hộ</p>
                </div>
              </div>
              {isMandatory && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hộ chưa đóng</p>
                    <p className="text-base font-semibold text-orange-600">{soHoChuaDong} hộ</p>
                  </div>
                </div>
              )}
            </div>
            
            {khoanThu.moTa && (
              <div className="pt-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Mô tả</p>
                <p className="text-base">{khoanThu.moTa}</p>
              </div>
            )}
            
            {(khoanThu.ngayBatDau || khoanThu.ngayKetThuc) && (
              <div className="flex gap-6 pt-2">
                {khoanThu.ngayBatDau && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</p>
                      <p className="text-base">
                        {new Date(khoanThu.ngayBatDau).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                )}
                {khoanThu.ngayKetThuc && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ngày kết thúc</p>
                      <p className="text-base">
                        {new Date(khoanThu.ngayKetThuc).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê nộp tiền</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="paid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paid">Đã đóng ({soHoDaDong})</TabsTrigger>
                {isMandatory && (
                  <TabsTrigger value="unpaid">Chưa đóng ({soHoChuaDong})</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="paid" className="mt-4">
                {hoDaDong.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Chưa có hộ nào đóng khoản thu này
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Tên chủ hộ</TableHead>
                          <TableHead>Địa chỉ</TableHead>
                          <TableHead>Trạng thái</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hoDaDong.map((ho) => (
                          <TableRow key={ho.id}>
                            <TableCell>{ho.id}</TableCell>
                            <TableCell className="font-medium">{ho.tenChuHo}</TableCell>
                            <TableCell>{ho.diaChi}</TableCell>
                            <TableCell>
                              <Badge variant={ho.trangThai === 1 ? "default" : "secondary"}>
                                {ho.trangThai === 1 ? "Đang ở" : "Đã chuyển đi"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              {isMandatory && hoChuaDong && (
                <TabsContent value="unpaid" className="mt-4">
                  {hoChuaDong.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Tất cả các hộ đã đóng khoản thu này
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tên chủ hộ</TableHead>
                            <TableHead>Địa chỉ</TableHead>
                            <TableHead>Trạng thái</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {hoChuaDong.map((ho) => (
                            <TableRow key={ho.id}>
                              <TableCell>{ho.id}</TableCell>
                              <TableCell className="font-medium">{ho.tenChuHo}</TableCell>
                              <TableCell>{ho.diaChi}</TableCell>
                              <TableCell>
                                <Badge variant={ho.trangThai === 1 ? "default" : "secondary"}>
                                  {ho.trangThai === 1 ? "Đang ở" : "Đã chuyển đi"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
